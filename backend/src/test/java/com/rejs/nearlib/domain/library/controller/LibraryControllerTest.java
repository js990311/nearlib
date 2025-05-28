package com.rejs.nearlib.domain.library.controller;

import com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
                .alwaysDo(MockMvcRestDocumentationWrapper.document("{class-name}/{method-name}"))
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }


    @Test
    @Disabled("library/{id} -> librayDto")
    void getLibraryId() throws Exception {
        mockMvc.perform(get("/library/{id}", 1L))
                .andExpect(status().isOk())
                .andDo(MockMvcRestDocumentationWrapper.document(
                        "{class-name}/{method-name}",
                        resource(
                                ResourceSnippetParameters.builder()
                                        .description("ID로 도서관 조회")
                                        .pathParameters(
                                                parameterWithName("id").description("도서관 고유 ID")
                                        )
                                        .responseFields(
                                                fieldWithPath("id").description("도서관 번호"),
                                                fieldWithPath("name").description("도서관 이름"),
                                                fieldWithPath("address").description("도서관 주소"),
                                                fieldWithPath("latitude").description("도서관 위도"),
                                                fieldWithPath("longitude").description("도서관 경도"),
                                                fieldWithPath("webpage").description("도서관 홈페이지")
                                        )
                                        .build()
                        )
                ));

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