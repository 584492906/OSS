package com.shinowit.actions.instock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/26.
 */
public class InStockDetailInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockDetailsInfo> dao;
    private List<TMeInStockDetailsInfo> list;
    private TMeInStockInfo mer;
    private int page;
    private int limit;
    private int rowcount;


    public String queryInStockDetailInfo() {


        list = dao.queryForPage("from TMeInStockDetailsInfo where meInStockInfo.billCode=?", page, limit, mer.getBillCode());

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

    public List<TMeInStockDetailsInfo> getList() {
        return list;
    }

    public void setList(List<TMeInStockDetailsInfo> list) {
        this.list = list;
    }

    public TMeInStockInfo getMer() {
        return mer;
    }

    public void setMer(TMeInStockInfo mer) {
        this.mer = mer;
    }
}
