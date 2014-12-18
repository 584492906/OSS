package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class StockForOneAction extends ActionSupport {
    @Resource
    private BaseDao<TMeStockInfo> dao;
    private List<TMeStockInfo> stockinfo;
    private String merchandiseId;

    public String queryForOne(){

        stockinfo=(List)dao.findByHql("from TMeStockInfo where meMerchandiseInfo.merchandiseId=?",merchandiseId);


        return SUCCESS;
    }


    public List<TMeStockInfo> getStockinfo() {
        return stockinfo;
    }

    public void setStockinfo(List<TMeStockInfo> stockinfo) {
        this.stockinfo = stockinfo;
    }

    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }
}
