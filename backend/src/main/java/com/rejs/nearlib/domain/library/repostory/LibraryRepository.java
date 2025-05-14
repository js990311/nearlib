package com.rejs.nearlib.domain.library.repostory;

import com.rejs.nearlib.domain.library.entity.Library;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library,Long> {
    Page<Library> findByNameContaining(@Param("name") String name, Pageable pageable);

    @Query("select l.id from Library l")
    List<Long> findAllId();
}
