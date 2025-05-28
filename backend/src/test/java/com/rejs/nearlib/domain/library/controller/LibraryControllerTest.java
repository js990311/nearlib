package com.rejs.nearlib.domain.library.controller;

import com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rejs.nearlib.global.AbstractTestContainerTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
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
    @DisplayName("library/near -> PageDto<NearLibraryDto>")
    void getNearLibrary() throws Exception {
        mockMvc.perform(get("/library/near")
                .param("lat", "37.58")
                .param("lng", "127.02")
                .param("range", "1000000")
                .param("p", "0")
                .param("s", "20")
        ).andExpect(status().isOk())
                .andDo(MockMvcRestDocumentationWrapper.document(
                        "{class-name}/{method-name}",
                        resource(
                                ResourceSnippetParameters.builder()
                                        .description("ID로 도서관 조회")
                                        .queryParameters(
                                                parameterWithName("lat").description("위도"),
                                                parameterWithName("lng").description("경도"),
                                                parameterWithName("range").description("범위"),
                                                parameterWithName("p").description("페이지번호"),
                                                parameterWithName("s").description("페이지크기")
                                            )
                                        .responseFields(
                                                // PageDto
                                                fieldWithPath("contentSize").description("콘텐츠 크기"),
                                                fieldWithPath("pageNumber").description("페이지 번호"),
                                                fieldWithPath("pageSize").description("pageSize"),
                                                fieldWithPath("contents").description("실제 데이터"),
                                                // NearLibraryDto
                                                fieldWithPath("contents[].id").description("도서관 번호"),
                                                fieldWithPath("contents[].name").description("도서관 이름"),
                                                fieldWithPath("contents[].address").description("도서관 주소"),
                                                fieldWithPath("contents[].latitude").description("도서관 위도"),
                                                fieldWithPath("contents[].longitude").description("도서관 경도"),
                                                fieldWithPath("contents[].webpage").description("도서관 홈페이지"),
                                                fieldWithPath("contents[].distance").description("위치로부터 도서관까지의 거리")
                                        )
                                        .build()
                        )
                ));
        ;
    }

    @Test
    void getAllLibrariesId() {
    }

    @Test
    @DisplayName("library/search -> PageDto<LibraryDto>")
    void getSearchLibraryByEngine() throws Exception {
        mockMvc.perform(get("/library/search")
                        .param("q", "도서관")
                        .param("p", "1")
                        .param("s", "20")
                ).andExpect(status().isOk())
                .andDo(MockMvcRestDocumentationWrapper.document(
                        "{class-name}/{method-name}",
                        resource(
                                ResourceSnippetParameters.builder()
                                        .description("ID로 도서관 조회")
                                        .queryParameters(
                                                parameterWithName("q").description("검색어"),
                                                parameterWithName("p").description("페이지번호"),
                                                parameterWithName("s").description("페이지크기")
                                        )
                                        .responseFields(
                                                // PageDto
                                                fieldWithPath("contentSize").description("콘텐츠 크기"),
                                                fieldWithPath("pageNumber").description("페이지 번호"),
                                                fieldWithPath("pageSize").description("pageSize"),
                                                fieldWithPath("contents").description("실제 데이터"),
                                                // NearLibraryDto
                                                fieldWithPath("contents[].id").description("도서관 번호"),
                                                fieldWithPath("contents[].name").description("도서관 이름"),
                                                fieldWithPath("contents[].address").description("도서관 주소"),
                                                fieldWithPath("contents[].latitude").description("도서관 위도"),
                                                fieldWithPath("contents[].longitude").description("도서관 경도"),
                                                fieldWithPath("contents[].webpage").description("도서관 홈페이지")
                                        )
                                        .build()
                        )
                ));
        ;

    }

    @Test
    void getSuggest() throws Exception {
        mockMvc.perform(get("/library/suggest")
                        .param("q", "도서관")
                ).andExpect(status().isOk())
                .andDo(MockMvcRestDocumentationWrapper.document(
                        "{class-name}/{method-name}",
                        resource(
                                ResourceSnippetParameters.builder()
                                        .description("ID로 도서관 조회")
                                        .queryParameters(
                                                parameterWithName("q").description("검색어")
                                        )
                                        .responseFields(
                                                // ListDto
                                                fieldWithPath("count").description("데이터 개수"),
                                                fieldWithPath("contents").description("실제 데이터")
                                        )
                                        .build()
                        )
                ));
        ;

    }

    @Test
    void getToken() {
    }
}