// Mountain vertex shader — base low-poly form, no displacement

varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

void main() {
  vUv = uv;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vElevation = position.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
