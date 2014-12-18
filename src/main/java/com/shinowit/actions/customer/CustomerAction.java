package com.shinowit.actions.customer;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;
import java.util.List;


public class CustomerAction extends ActionSupport {
    @Resource
    private BaseDao<TBaMemberInfo> dao;
    private List<TBaMemberInfo> cuslist;


    public String queryCustomer() {

        cuslist = dao.listAll(TBaMemberInfo.class);


        return SUCCESS;
    }


    public List<TBaMemberInfo> getCuslist() {
        return cuslist;
    }

    public void setCuslist(List<TBaMemberInfo> cuslist) {
        this.cuslist = cuslist;
    }
}
