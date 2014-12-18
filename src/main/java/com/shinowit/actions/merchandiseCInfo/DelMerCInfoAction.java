package com.shinowit.actions.merchandiseCInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-12.
 */
public class DelMerCInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> dao;
    private TMeMerchandiseCInfo merchandise;
    private boolean success;
    private String message;

    public String delMer() {

        boolean result = dao.delete(merchandise);
        if (result == true) {
            setSuccess(true);
            message = "删除成功";

        } else {
            setSuccess(false);
            message = "删除失败";
        }

        return SUCCESS;
    }


    public TMeMerchandiseCInfo getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(TMeMerchandiseCInfo merchandise) {
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
