const glsl = (t, defines) => t.raw[0] + defines + t.raw[1];

export default defines => glsl`#version 300 es

${defines}

precision mediump float;

uniform LIGHT {
    vec4 position[NUMBER_OF_LIGHTS];
    vec4 diffuse[NUMBER_OF_LIGHTS];
    vec4 specular[NUMBER_OF_LIGHTS];
    vec4 ambient;
} light;

// material:
uniform vec4 materialColor;
uniform vec4 materialAmbient;
uniform vec4 materialSpecular;
uniform float shininess;

#ifdef HAS_MAP
uniform sampler2D map;
#endif

in vec3 vNormal;
in vec2 vTexCoord;
out vec4 fragColor;

void main() {
    vec3 normal = normalize(vNormal); // Normaliser normalen

    // Ambient lighting
    vec3 ambient = vec3(light.ambient) * vec3(materialAmbient);

    // Diffuse and specular lighting
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
    
    // Iterate over all lights
    for (int i = 0; i < NUMBER_OF_LIGHTS; i++) {
        // Calculate diffuse and specular lighting
        vec3 lightDir = normalize(light.position[i].xyz - vNormal);
        float lambertian = max(dot(lightDir, normal), 0.0);
        vec3 reflectDir = reflect(-lightDir, normal);
        vec3 viewDir = normalize(-vNormal); // Eye direction

        // Diffuse term
        diffuse += lambertian * vec3(light.diffuse[i]);

        // Specular term
        float specAngle = max(dot(viewDir, reflectDir), 0.0);
        specular += pow(specAngle, shininess) * vec3(light.specular[i]);
    }

    // Combine results
    vec3 lighting = ambient + diffuse + specular;
    
    #ifdef HAS_MAP
    vec4 texColor = texture(map, vTexCoord);
    lighting *= texColor.rgb;
    #endif

    fragColor = vec4(lighting, 1.0);
}`;