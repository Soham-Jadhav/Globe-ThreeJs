// Pass the globe texture like React props
uniform sampler2D globeTexture;

// type --vec2 (recieve like props)
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    // // Use the globeTexture data passed along with the uv coords (vertexUV)
    // texture2D(globeTexture, vertexUV);

    // // Color the fragments
    // gl_FragColor = vec4(0.4, 1, 1, 1);

    // // Set globe texture 
    // gl_FragColor = texture2D(globeTexture, vertexUV);

    // To do destructuring to get x, y, z use something like .xyz in the end

    // Experiment to get an atmosphere tint texture
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    // Add tint/atmosphere to the top
    // gl_FragColor = vec4(vec3(0, 0.1, 0.2) + texture2D(globeTexture, vertexUV).xyz, 1.0);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}