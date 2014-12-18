package com.shinowit.actions.merchandiseCInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-12.
 */
public class AddMerchandiseAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> dao;
    private TMeMerchandiseCInfo merchandise;
    private String message;
    private boolean success;


    public String addMer() {

        Object o = dao.insert(merchandise);

        if (o != null) {

            setSuccess(true);
            message = "添加成功";

        } else {
            setSuccess(false);
            message = "添加失败";
        }

        return SUCCESS;
    }


    public TMeMerchandiseCInfo getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(TMeMerchandiseCInfo merchandise) {
        this.merchandise = merchandise;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
