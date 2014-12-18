package com.shinowit.actions.menu;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/12/9.
 */
public class MenuAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> dao;
    private List<TAuMenuInfo> menu;
    private String name;
    private int page;
    private int limit;
    private int rowcount;
    public static String charSet(String code) {
        try {
            byte[] bb = code.getBytes("ISO-8859-1");
            code = new String(bb, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return code;
    }

    public String queryMenu() {

        if (name == null) {

            menu = dao.queryForPage("from TAuMenuInfo", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TAuMenuInfo");
        } else {
            name=charSet(name);
            menu = dao.queryForPage("from TAuMenuInfo where menuName like \'%" + name + "%\'", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TAuMenuInfo where menuName like \'%" + name + "%\'");
        }
        return SUCCESS;

    }


    public List<TAuMenuInfo> getMenu() {
        return menu;
    }

    public void setMenu(List<TAuMenuInfo> menu) {
        this.menu = menu;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRowcount() {
        return rowcount;
    }

    public void setRowcount(int rowcount) {
        this.rowcount = rowcount;
    }
}
