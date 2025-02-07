package com.rejs.nearlib.global.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageDto<T> {
    private List<T> contents;
    private Integer contentSize;
    private Integer pageNumber;
    private Integer pageSize;

    public PageDto(List<T> contents, Integer contentSize, Integer pageNumber, Integer pageSize) {
        this.contents = contents;
        this.contentSize = contentSize;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    public static <T> PageDto<T> of(Page<T> data){
        return new PageDto<>(
                data.getContent(),
                data.getNumberOfElements(),
                data.getNumber()+1,
                data.getTotalPages()
        );
    }
}
