package com.rejs.nearlib.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder(access = AccessLevel.PROTECTED)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "library")
public class Library {

    @Id
    @Column(name = "library_id")
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private Double longitude;

    @Column
    private Double latitude;

    @Column
    private String webpage;
}
