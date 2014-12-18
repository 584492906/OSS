package com.shinowit.actions.merchandiseInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/13.
 */
public class MerchandiseInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> dao;
    private List<TMeMerchandiseInfo> merchandiseInfo;
    private int page;
    private int limit;
    private int rowcount;

    public String queryMerchandise() {

        merchandiseInfo = dao.queryForPage("from TMeMerchandiseInfo", page, limit);
        rowcount = dao.queryRecordCount("select count(*) from TMeMerchandiseInfo");
        return SUCCESS;
    }


    public List<TMeMerchandiseInfo> getMerchandiseInfo() {
        return merchandiseInfo;
    }

    public void setMerchandiseInfo(List<TMeMerchandiseInfo> merchandiseInfo) {
        this.merchandiseInfo = merchandiseInfo;
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
