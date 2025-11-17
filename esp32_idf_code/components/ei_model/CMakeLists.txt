file(GLOB_RECURSE TFLITE_MICRO_SRCS
    "edge-impulse-sdk/tensorflow/lite/micro/*.cc"
)

file(GLOB_RECURSE TFLITE_CORE_SRCS
    "edge-impulse-sdk/tensorflow/lite/core/*.cc"
)


file(GLOB_RECURSE TFLITE_KERNELS_SRCS
    "edge-impulse-sdk/tensorflow/lite/kernels/*.cc"
)

# Exclure les fichiers de test
list(FILTER TFLITE_MICRO_SRCS EXCLUDE REGEX ".*test.*")
list(FILTER TFLITE_CORE_SRCS EXCLUDE REGEX ".*test.*")
list(FILTER TFLITE_KERNELS_SRCS EXCLUDE REGEX ".*test.*")

idf_component_register(
    SRCS 
        # Classifier
        "edge-impulse-sdk/classifier/ei_run_classifier_c.cpp"
        
        # TFLite model
        "tflite-model/tflite_learn_818072_5_compiled.cpp"
        
        # DSP
        "edge-impulse-sdk/dsp/kissfft/kiss_fft.cpp"
        "edge-impulse-sdk/dsp/kissfft/kiss_fftr.cpp"
        "edge-impulse-sdk/dsp/dct/fast-dct-fft.cpp"
        "edge-impulse-sdk/dsp/memory.cpp"
        "edge-impulse-sdk/dsp/image/processing.cpp"
        
        # Porting Espressif
        "edge-impulse-sdk/porting/espressif/ei_classifier_porting.cpp"
        "edge-impulse-sdk/porting/espressif/debug_log.cpp"
        
        # TensorFlow Lite (tous les .cc)
        ${TFLITE_MICRO_SRCS}
        ${TFLITE_CORE_SRCS}
        ${TFLITE_KERNELS_SRCS}
        
    INCLUDE_DIRS 
        "."
        "edge-impulse-sdk"
        "edge-impulse-sdk/tensorflow"
        "edge-impulse-sdk/third_party"
        "edge-impulse-sdk/third_party/flatbuffers/include"
        "edge-impulse-sdk/third_party/gemmlowp"
        "edge-impulse-sdk/third_party/ruy"
        "model-parameters"
        "tflite-model"
        
    REQUIRES 
        main
)

target_compile_options(${COMPONENT_LIB} PRIVATE 
    -Wno-maybe-uninitialized
    -Wno-missing-field-initializers
    -Wno-return-type
    -Wno-strict-aliasing
    -fno-rtti
    -fno-exceptions
    -fno-threadsafe-statics
)