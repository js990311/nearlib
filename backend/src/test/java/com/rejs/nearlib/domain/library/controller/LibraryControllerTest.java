package com.rejs.nearlib.domain.library.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;

@ExtendWith(RestDocumentationExtension.class)
@AutoConfigureMockMvc
class LibraryControllerTest extends AbstractTestContainerTest {

    @Autowired
    protected ObjectMapper objectMapper;
    protected MockMvc mockMvc;

    @BeforeEach
    void setUp(final WebApplicationContext context, final RestDocumentationContextProvider restDocumentation){
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(MockMvcResultHandlers.print())
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }


    @Test
    void getLibraryId() {
    }

    @Test
    void getNearLibrary() {
    }

    @Test
    void getAllLibrariesId() {
    }

    @Test
    void getSearchLibraryByEngine() {
    }

    @Test
    void getSuggest() {
    }

    @Test
    void getToken() {
    }
}