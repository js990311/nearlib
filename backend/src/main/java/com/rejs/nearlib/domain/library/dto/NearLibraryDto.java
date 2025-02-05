package com.rejs.nearlib.domain.library.dto;

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
}
