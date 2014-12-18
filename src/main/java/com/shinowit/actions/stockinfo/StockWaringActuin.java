package com.shinowit.actions.stockinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/10.
 */
public class StockWaringActuin extends ActionSupport {
    @Resource
    private BaseDao<TMeStockInfo> dao;
    private List<TMeStockInfo> stockList;
    private int num;

    public String warningStock() {
        stockList = (List) dao.findByHql("from TMeStockInfo where num<?", num);
        return SUCCESS;
    }


    public List<TMeStockInfo> getStockList() {
        return stockList;
    }

    public void setStockList(List<TMeStockInfo> stockList) {
        this.stockList = stockList;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
