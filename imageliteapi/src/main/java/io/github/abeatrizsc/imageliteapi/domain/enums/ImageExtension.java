package io.github.abeatrizsc.imageliteapi.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.MediaType;

import java.util.Arrays;

@AllArgsConstructor
public enum ImageExtension {
    JPEG(MediaType.IMAGE_JPEG),
    PNG(MediaType.IMAGE_PNG),
    GIF(MediaType.IMAGE_GIF);

    @Getter
    private MediaType mediaType;

    public static ImageExtension valueOf(MediaType mediaType){
        return Arrays.stream(values())
                .filter(extension -> extension.mediaType.equals(mediaType))
                .findFirst().orElse(null);
    }

    public static ImageExtension ofName(String name){
        return Arrays.stream(values())
                .filter(ie -> ie.name().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}
