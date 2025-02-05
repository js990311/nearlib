package com.rejs.nearlib.domain.library.insert.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LibraryTuple {
    private Long id;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String webpage;

    public static LibraryTuple from(String[] row){
        return builder()
                .id(Long.valueOf(row[0]))
                .name(row[1])
                .address(row[2])
                .latitude(Double.parseDouble(row[3]))
                .longitude(Double.parseDouble(row[4]))
                .webpage(row[11])
                .build();
    }
}
