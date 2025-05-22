package com.rejs.nearlib.domain.library.dto;

import com.rejs.nearlib.domain.library.entity.Library;
import lombok.*;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class NearLibraryDto {
    private Long id;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String webpage;
    private Double distance;

    public NearLibraryDto(Library library, double distance) {
        this.id = library.getId();
        this.name = library.getName();
        this.address = library.getAddress();
        this.longitude = library.getLongitude();
        this.latitude = library.getLatitude();
        this.webpage = library.getWebpage();
        this.distance = distance;
    }
}
