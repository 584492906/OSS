package com.shinowit.actions.outstock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/2.
 */
public class OutStockDetailAction extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockDetailsInfo> dao;
    private List<TMeOutStockDetailsInfo> stockList;
    private int page;
    private int limit;
    private int rowcount;
    private TMeOutStockInfo outStock;


    public String queryStockDetail() {


        stockList = dao.queryForPage("from TMeOutStockDetailsInfo where meOutStockInfo.outBillCode=?", page, limit, outStock.getOutBillCode());
        rowcount=dao.queryRecordCount("select count(*) from TMeOutStockDetailsInfo");
        return SUCCESS;

    }


    public TMeOutStockInfo getOutStock() {
        return outStock;
    }

    public void setOutStock(TMeOutStockInfo outStock) {
        this.outStock = outStock;
    }

    public List<TMeOutStockDetailsInfo> getStockList() {
        return stockList;
    }

    public void setStockList(List<TMeOutStockDetailsInfo> stockList) {
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
