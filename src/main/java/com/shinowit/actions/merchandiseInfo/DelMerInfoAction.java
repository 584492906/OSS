package com.shinowit.actions.merchandiseInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
public class DelMerInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> dao;
    private TMeMerchandiseInfo merchandise;
    private boolean success;
    private String message;


    public String delMerInfo() {


        Object o = dao.delete(merchandise);
        if (o != null) {
            setSuccess(true);
            message = "删除成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "删除失败";
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
