package com.rejs.nearlib.domain.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.search.engine.backend.types.Projectable;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.bridge.builtin.annotation.GeoPointBinding;
import org.hibernate.search.mapper.pojo.bridge.builtin.annotation.Latitude;
import org.hibernate.search.mapper.pojo.bridge.builtin.annotation.Longitude;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "libraries")
@Indexed
@GeoPointBinding(fieldName = "location", sortable = Sortable.YES, projectable = Projectable.YES)
public class Library {

    @Id
    @Column(name = "library_id")
    private Long id;

    @Column
    @FullTextField(analyzer = "nori-korean-index", projectable = Projectable.YES)
    private String name;

    @Column
    @FullTextField(analyzer = "nori-korean-index")
    private String address;

    @Longitude
    @Column
    private Double longitude;

    @Latitude
    @Column
    private Double latitude;

    @Column
    private String webpage;
}
