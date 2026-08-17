<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  model: { type: String, required: true },
  interactive: { type: Boolean, default: true },
  scale: { type: Number, default: 1.4 },
})

const container = ref(null)
const loading = ref(true)
const error = ref(false)
const activated = ref(false)

let renderer, scene, camera, controls, frameId, resizeObserver, model

function frameObject(object, cam, ctrls) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  object.position.sub(center)

  const maxDim = Math.max(size.x, size.y, size.z) || 1
  const distance = maxDim / (2 * Math.tan((cam.fov * Math.PI) / 360)) * (1.6 / 1.8)

  cam.position.set(distance * 0.6, distance * 0.5, distance)
  cam.near = distance / 100
  cam.far = distance * 100
  cam.updateProjectionMatrix()

  ctrls.target.set(0, 0, 0)
  ctrls.update()
}

onMounted(async () => {
  const el = container.value
  const width = el.clientWidth
  const height = el.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  scene.add(new THREE.HemisphereLight(0xffffff, 0x445544, 1.1))
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
  keyLight.position.set(3, 5, 4)
  scene.add(keyLight)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
  fillLight.position.set(-4, 2, -3)
  scene.add(fillLight)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enableZoom = true
  controls.zoomToCursor = true
  controls.enablePan = false
  controls.minDistance = 0.1
  controls.maxDistance = 1000
  controls.enabled = false

  if (props.interactive) {
    // Allow normal page scrolling over the canvas until the user opts into
    // 3D interaction; only then does the canvas capture drags. On mobile
    // screens a double-tap is required so a single scroll-swipe doesn't
    // get grabbed by the model; desktop activates on a single click.
    renderer.domElement.style.touchAction = 'manipulation'

    let lastTapTime = 0
    const DOUBLE_TAP_MS = 350

    function activate() {
      activated.value = true
      controls.enabled = true
      renderer.domElement.style.touchAction = 'none'
    }

    renderer.domElement.addEventListener('pointerdown', (event) => {
      if (!activated.value) {
        if (window.innerWidth >= 768) {
          activate()
        } else {
          const now = event.timeStamp
          if (now - lastTapTime < DOUBLE_TAP_MS) activate()
          lastTapTime = now
        }
        return
      }
      renderer.domElement.style.cursor = 'grabbing'
    })
    renderer.domElement.addEventListener('pointerup', () => {
      if (activated.value) renderer.domElement.style.cursor = 'grab'
    })
  }

  const loader = new GLTFLoader()
  loader.load(
    props.model,
    (gltf) => {
      // Center the model's own geometry around the wrapper's pivot, so that
      // rotating the wrapper spins it in place instead of orbiting around a
      // point that isn't its actual center.
      const localBox = new THREE.Box3().setFromObject(gltf.scene)
      const localCenter = localBox.getCenter(new THREE.Vector3())
      gltf.scene.position.sub(localCenter)

      const wrapper = new THREE.Group()
      wrapper.add(gltf.scene)
      scene.add(wrapper)

      frameObject(wrapper, camera, controls)
      wrapper.scale.setScalar(props.scale)
      wrapper.rotation.y = (240 * Math.PI) / 180

      const size = localBox.getSize(new THREE.Vector3())
      const offset = size.length() * 0.06
      wrapper.position.x += offset - size.length() * 0.12
      wrapper.position.y += offset + size.length() * 0.05

      model = wrapper
      loading.value = false
    },
    undefined,
    () => {
      loading.value = false
      error.value = true
    }
  )

  const animate = () => {
    frameId = requestAnimationFrame(animate)
    if (model && !activated.value) model.rotation.y += 0.003
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  resizeObserver = new ResizeObserver(() => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  })
  resizeObserver.observe(el)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  controls?.dispose()
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
  scene?.traverse((obj) => {
    obj.geometry?.dispose()
    if (obj.material) {
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
      materials.forEach((m) => m.dispose())
    }
  })
})
</script>

<template>
  <div ref="container" class="relative h-full w-full overflow-hidden">
    <div
      v-if="loading"
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-light text-sm font-semibold text-muted"
    >
      Nalaganje 3D modela …
    </div>
    <div
      v-if="error"
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-light text-sm font-semibold text-muted"
    >
      3D modela ni bilo mogoče naložiti
    </div>
    <div
      v-if="interactive && !activated && !loading && !error"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span class="rounded-full bg-dark/70 px-3.5 py-2 text-sm font-semibold text-white/70">
        <span class="md:hidden">Dvokliknite za 3D pogled</span>
        <span class="hidden md:inline">Kliknite za 3D pogled</span>
      </span>
    </div>
  </div>
</template>
