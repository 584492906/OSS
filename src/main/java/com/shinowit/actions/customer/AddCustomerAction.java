package com.shinowit.actions.customer;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-11.
 */
public class AddCustomerAction extends ActionSupport {
    @Resource
    private BaseDao<TBaMemberInfo> dao;
    private TBaMemberInfo customer;
    private boolean success;
    private String message;


    public String addCustomer() {

        Object o = dao.insert(customer);
        if (o != null) {
            setSuccess(true);
            message = "添加成功";
        } else {
            setSuccess(false);
            message = "添加失败";
        }

        return SUCCESS;
    }


    public TBaMemberInfo getCustomer() {
        return customer;
    }

    public void setCustomer(TBaMemberInfo customer) {
        this.customer = customer;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
