package com.shinowit.actions.author;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
public class AuthorAll extends ActionSupport {
    @Resource
    private BaseDao<TAuAuthorization> dao;
    private List<TAuAuthorization> author;


    public String queryAuthor() {

        author = dao.listAll(TAuAuthorization.class);

        return SUCCESS;

    }


    public List<TAuAuthorization> getAuthor() {
        return author;
    }

    public void setAuthor(List<TAuAuthorization> author) {
        this.author = author;
    }
}
