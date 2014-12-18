package com.shinowit.actions.merchandiseCInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-12.
 */
public class UpMeDiCInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> dao;
    private boolean success;
    private String message;
    private TMeMerchandiseCInfo merchandise;


    public String updateMerchandise() {

        boolean result = dao.update(merchandise);
        if (result == true) {
            setSuccess(true);
            message = "修改成功";

        } else {
            setSuccess(false);
            message = "修改失败";
        }


        return SUCCESS;
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

    public TMeMerchandiseCInfo getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(TMeMerchandiseCInfo merchandise) {
        this.merchandise = merchandise;
    }
}
