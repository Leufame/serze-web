<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  Mesh,
  ShaderMaterial,
  Vector2,
  Color,
  NormalBlending,
} from 'three'
import { gsap } from 'gsap'
import inkWashVert from './shaders/inkWash.vert?raw'
import inkWashFrag from './shaders/inkWash.frag?raw'
import mountainVert from './shaders/mountain.vert?raw'
import mountainFrag from './shaders/mountain.frag?raw'

const container = ref<HTMLElement | null>(null)

let scene: Scene
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let mountain: Mesh
let mountainMat: ShaderMaterial
let inkMat: ShaderMaterial
let particles: Points
let particlesMat: PointsMaterial
let resizeObserver: ResizeObserver | null = null

const mouseTarget = new Vector2(0, 0)
const mouseLerp = new Vector2(0, 0)
let posArray: Float32Array
let velArray: Float32Array
const startTime = performance.now()
let running = true
let themeObserver: MutationObserver | null = null

const PARTICLE_COUNT = 140

const readThemeColor = (name: string, fallback: string): Color => {
  if (typeof window === 'undefined') return new Color(fallback)
  const root = document.documentElement
  const v = getComputedStyle(root).getPropertyValue(name).trim()
  return v ? new Color(v) : new Color(fallback)
}

const refreshThemeColors = () => {
  if (!mountainMat || !inkMat || !particlesMat) return
  mountainMat.uniforms.uColor.value = readThemeColor('--color-ink', '#0a0a0a')
  mountainMat.uniforms.uPaper.value = readThemeColor('--color-paper', '#f5f3ee')
  inkMat.uniforms.uInkColor.value = readThemeColor('--color-ink', '#0a0a0a')
  particlesMat.color = readThemeColor('--color-ink', '#0a0a0a')
}

const buildMountain = (): Mesh => {
  const width = 6
  const depth = 3
  const segX = 18
  const segZ = 10

  const geometry = new PlaneGeometry(width, depth, segX, segZ)
  geometry.rotateX(-Math.PI / 2)

  const pos = geometry.attributes.position
  const vertex = { x: 0, y: 0, z: 0 }

  for (let i = 0; i < pos.count; i++) {
    vertex.x = pos.getX(i)
    vertex.y = pos.getY(i)
    vertex.z = pos.getZ(i)

    const peak1 = Math.exp(-Math.pow((vertex.x - 0.8) / 1.4, 2)) * Math.max(0, 1 - Math.abs(vertex.z / (depth / 2)) * 0.6)
    const peak2 = Math.exp(-Math.pow((vertex.x + 1.4) / 1.1, 2)) * Math.max(0, 1 - Math.abs(vertex.z / (depth / 2)) * 0.8) * 0.55
    const noise = (Math.sin(vertex.x * 3.0) * 0.05 + Math.cos(vertex.z * 4.0) * 0.04)

    pos.setY(i, (peak1 + peak2) * 2.4 + noise)
  }

  pos.needsUpdate = true
  geometry.computeVertexNormals()

  mountainMat = new ShaderMaterial({
    vertexShader: mountainVert,
    fragmentShader: mountainFrag,
    transparent: true,
    uniforms: {
      uColor:   { value: new Color('#0a0a0a') },
      uPaper:   { value: new Color('#f5f3ee') },
      uOpacity: { value: 0 },
      uTime:    { value: 0 },
    },
  })

  const m = new Mesh(geometry, mountainMat)
  m.position.set(0, -0.6, 0)
  m.rotation.y = -0.15
  return m
}

const buildInkParticles = (): Points => {
  const geometry = new BufferGeometry()
  posArray = new Float32Array(PARTICLE_COUNT * 3)
  velArray = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    posArray[i * 3]     = (Math.random() - 0.5) * 12
    posArray[i * 3 + 1] = (Math.random() - 0.5) * 6
    posArray[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5

    velArray[i * 3]     = (Math.random() - 0.5) * 0.0008
    velArray[i * 3 + 1] = -0.0008 - Math.random() * 0.001
    velArray[i * 3 + 2] = (Math.random() - 0.5) * 0.0004
  }

  geometry.setAttribute('position', new BufferAttribute(posArray, 3))

  particlesMat = new PointsMaterial({
    color: 0x0a0a0a,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: NormalBlending,
  })

  return new Points(geometry, particlesMat)
}

const buildInkWash = (): Mesh => {
  const geometry = new PlaneGeometry(14, 8, 32, 16)

  inkMat = new ShaderMaterial({
    vertexShader: inkWashVert,
    fragmentShader: inkWashFrag,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime:     { value: 0 },
      uInkColor: { value: new Color('#0a0a0a') },
      uOpacity:  { value: 0 },
      uBleed:    { value: 0.45 },
    },
  })

  const mesh = new Mesh(geometry, inkMat)
  mesh.position.set(0, 0, -3)
  return mesh
}

const init = () => {
  if (!container.value) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  scene = new Scene()
  scene.background = null

  const { clientWidth, clientHeight } = container.value
  camera = new PerspectiveCamera(35, clientWidth / clientHeight, 0.1, 100)
  camera.position.set(0, 0.6, 8.5)
  camera.lookAt(0, 0, 0)

  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(clientWidth, clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  scene.add(buildInkWash())
  mountain = buildMountain()
  scene.add(mountain)
  particles = buildInkParticles()
  scene.add(particles)

  refreshThemeColors()

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(container.value)

  themeObserver = new MutationObserver(() => refreshThemeColors())
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  if (!reduced) {
    gsap.ticker.add(tick)
  } else {
    tick(0)
  }
}

const onResize = () => {
  if (!container.value || !renderer || !camera) return
  const { clientWidth, clientHeight } = container.value
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight)
}

const onMouseMove = (e: MouseEvent) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

const tick = (_time: number) => {
  if (!running || !renderer || !scene || !camera) return

  const elapsed = (performance.now() - startTime) / 1000

  if (mountainMat) {
    mountainMat.uniforms.uOpacity.value = Math.min(1, elapsed * 0.6)
    mountainMat.uniforms.uTime.value = elapsed
  }
  if (inkMat) {
    inkMat.uniforms.uOpacity.value = Math.min(0.4, elapsed * 0.3)
    inkMat.uniforms.uTime.value = elapsed
  }
  if (particlesMat) {
    particlesMat.opacity = Math.min(0.7, elapsed * 0.45)
  }

  mouseLerp.x += (mouseTarget.x - mouseLerp.x) * 0.06
  mouseLerp.y += (mouseTarget.y - mouseLerp.y) * 0.06

  camera.position.x = mouseLerp.x * 0.4
  camera.position.y = 0.6 + mouseLerp.y * 0.25
  camera.lookAt(0, 0, 0)

  if (mountain) {
    mountain.rotation.y = -0.15 + mouseLerp.x * 0.06
  }

  if (particles) {
    const pos = particles.geometry.attributes.position as BufferAttribute
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      let x = posArray[i3]     + velArray[i3]     * 16
      let y = posArray[i3 + 1] + velArray[i3 + 1] * 16
      const z = posArray[i3 + 2]
      if (x < -6) x = 6
      else if (x > 6) x = -6
      if (y < -3) y = 3
      posArray[i3]     = x
      posArray[i3 + 1] = y
      posArray[i3 + 2] = z
    }
    pos.needsUpdate = true
  }

  renderer.render(scene, camera)
}

const teardown = () => {
  running = false
  gsap.ticker.remove(tick)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }
  window.removeEventListener('mousemove', onMouseMove)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
  scene?.traverse((obj) => {
    if (obj instanceof Mesh || obj instanceof Points) {
      obj.geometry?.dispose()
      const mat = obj.material as ShaderMaterial | PointsMaterial
      mat?.dispose()
    }
  })
}

onMounted(() => {
  if (!container.value) return
  requestAnimationFrame(init)
})

onBeforeUnmount(teardown)
</script>

<template>
  <div ref="container" class="hero-scene" aria-hidden="true" />
</template>

<style lang="scss" scoped>
@use '~/assets/styles/abstracts/variables' as *;

.hero-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  :deep(canvas) {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
