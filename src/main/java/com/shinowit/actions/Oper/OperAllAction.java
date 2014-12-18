package com.shinowit.actions.Oper;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class OperAllAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private List<TAuOperInfo> operinfo;
    private int page;
    private int limit;
    private int rowcount;


    public String queryOper() {


        operinfo = dao.queryForPage("from TAuOperInfo where state=true", page, limit);

        rowcount = dao.queryRecordCount("select count(*) from TAuOperInfo");
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

    public List<TAuOperInfo> getOperinfo() {
        return operinfo;
    }

    public void setOperinfo(List<TAuOperInfo> operinfo) {
        this.operinfo = operinfo;
    }
}
