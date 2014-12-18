package com.shinowit.actions.merchandiseCInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;


public class MerchandiseAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> dao;
    private List<TMeMerchandiseCInfo> merchandise;
    private int page;
    private int limit;
    private int rowcount;
    private String name;
    private boolean success;

    public static String charSet(String code) {
        try {
            byte[] bb = code.getBytes("ISO-8859-1");
            code = new String(bb, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return code;
    }

    public String queryMerchandiseCInfo() {
        if (name == null) {
            setSuccess(true);
            merchandise = dao.queryForPage("from TMeMerchandiseCInfo", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TMeMerchandiseCInfo");
        } else {
            name = charSet(name);
            setSuccess(true);
            merchandise = dao.queryForPage("from TMeMerchandiseCInfo where merchandiseCName like \'%"+ name +"%\' ", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TMeMerchandiseCInfo where merchandiseCName like \'%" + name +"%\'");
        }

        return SUCCESS;
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

    public List<TMeMerchandiseCInfo> getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(List<TMeMerchandiseCInfo> merchandise) {
        this.merchandise = merchandise;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
