package com.shinowit.actions.outstock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/2.
 */
public class OutStockInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockInfo> dao;
    private List<TMeOutStockInfo> stockList;
    private int page;
    private int limit;
    private int rowcount;


    public String queryStock() {


        stockList = dao.queryForPage("from TMeOutStockInfo", page, limit);
        rowcount = dao.queryRecordCount("select count(*) from TMeOutStockInfo");
        return SUCCESS;

    }


    public List<TMeOutStockInfo> getStockList() {
        return stockList;
    }

    public void setStockList(List<TMeOutStockInfo> stockList) {
        this.stockList = stockList;
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
