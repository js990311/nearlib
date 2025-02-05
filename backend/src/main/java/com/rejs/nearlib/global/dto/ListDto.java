package com.rejs.nearlib.global.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ListDto<T> {
    private List<T> contents;
    private Integer count;

    public ListDto(List<T> contents, Integer count) {
        this.contents = contents;
        this.count = count;
    }

    public static <T> ListDto<T> of(List<T> contents){
        return new ListDto<>(contents, contents.size());
    }
}
