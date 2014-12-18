package com.shinowit.actions.unitinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-12.
 */
public class UnitInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> dao;
    private List<TMeUnitInfo> unit;
    private int page;
    private int limit;
    private int rowcount;


    public String queryUnit() {

        unit = dao.queryForPage("from TMeUnitInfo", page, limit);
        rowcount = dao.queryRecordCount("select count(*) from TMeUnitInfo");


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

    public List<TMeUnitInfo> getUnit() {
        return unit;
    }

    public void setUnit(List<TMeUnitInfo> unit) {
        this.unit = unit;
    }
}
