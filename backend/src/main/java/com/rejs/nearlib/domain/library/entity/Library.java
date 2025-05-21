package com.rejs.nearlib.domain.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "libraries")
@Indexed
public class Library {

    @Id
    @Column(name = "library_id")
    private Long id;

    @Column
    @FullTextField(analyzer = "nori-korean")
    private String name;

    @Column
    @FullTextField(analyzer = "nori-korean")
    private String address;

    @Column
    private Double longitude;

    @Column
    private Double latitude;

    @Column
    private String webpage;
}
