package com.shinowit.actions.merchandiseInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
public class AddMerchandiseInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> dao;
    private TMeMerchandiseInfo merchandise;
    private boolean success;
    private String message;


    public String AddMerchadise() {


        Object o = dao.insert(merchandise);
        if (o != null) {
            setSuccess(true);
            message = "添加成功！";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "添加失败!";
            return SUCCESS;
        }

    }


    public TMeMerchandiseInfo getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(TMeMerchandiseInfo merchandise) {
        this.merchandise = merchandise;
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
