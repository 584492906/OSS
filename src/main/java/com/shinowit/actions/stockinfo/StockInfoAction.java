package com.shinowit.actions.stockinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;


public class StockInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeStockInfo> dao;

    private List<TMeStockInfo> stockinfo;
    private int page;
    private int limit;
    private int rowcount;
    private String name;
    public static String charSet(String code) {
        try {
            byte[] bb = code.getBytes("ISO-8859-1");
            code = new String(bb, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return code;
    }

    public String queryStockInfo() {
        if (name == null) {
            stockinfo = dao.queryForPage("from TMeStockInfo", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TMeStockInfo");

        } else {
           name=charSet(name);
            stockinfo = dao.queryForPage("from TMeStockInfo where meMerchandiseInfo.merchandiseName like \'%" + name + "%\'", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TMeStockInfo where meMerchandiseInfo.merchandiseName like \'%" + name + "%\'");

        }
        return SUCCESS;
    }


    public List<TMeStockInfo> getStockinfo() {
        return stockinfo;
    }

    public void setStockinfo(List<TMeStockInfo> stockinfo) {
        this.stockinfo = stockinfo;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
