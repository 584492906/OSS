package com.shinowit.actions.instock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/25.
 */
public class InStockInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockInfo> dao;
    private List<TMeInStockInfo> list;
    private int limit;
    private int rowcount;
    private int page;


    public String queryInStockInfo() {


        list = dao.queryForPage("from TMeInStockInfo", page, limit);
        rowcount = dao.queryRecordCount("select count(*) from TMeInStockInfo");
        return SUCCESS;
    }


    public List<TMeInStockInfo> getList() {
        return list;
    }

    public void setList(List<TMeInStockInfo> list) {
        this.list = list;
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

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
