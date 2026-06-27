// Mountain fragment shader — solid sumi black with soft paper bleed at base

uniform vec3 uColor;
uniform vec3 uPaper;
uniform float uOpacity;
uniform float uTime;

varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // Subtle grain on surface
  float grain = hash(floor(vWorldPos.xz * 40.0)) * 0.04 - 0.02;

  // Bottom dissolve — mountain melts into paper
  float bottomBleed = smoothstep(-1.5, -0.4, vElevation);
  bottomBleed = mix(0.0, 1.0, bottomBleed);

  // Top slight haze
  float top = smoothstep(2.5, 4.0, vElevation);

  vec3 col = mix(uPaper, uColor, bottomBleed);
  col += grain;

  float alpha = uOpacity * bottomBleed;
  alpha = mix(alpha, alpha * 0.4, top);

  gl_FragColor = vec4(col, alpha);
}
