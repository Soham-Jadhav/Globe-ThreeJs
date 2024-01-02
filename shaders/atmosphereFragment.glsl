// type --vec2 (recieve like props)
varying vec3 vertexNormal;

void main() {
    // Experiment to get an external atmosphere tint texture
    float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);

    // Add tint/atmosphere to the top
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}