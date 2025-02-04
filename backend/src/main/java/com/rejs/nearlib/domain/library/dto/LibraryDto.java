package com.rejs.nearlib.domain.library.dto;

import com.rejs.nearlib.domain.library.entity.Library;
import jakarta.persistence.Column;
import lombok.*;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LibraryDto {
    private Long id;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String webpage;

    public static LibraryDto of(Library library){
        return builder()
                .id(library.getId())
                .name(library.getName())
                .address(library.getAddress())
                .webpage(library.getWebpage())
                .latitude(library.getLatitude())
                .longitude(library.getLongitude())
                .build();
    }
}
