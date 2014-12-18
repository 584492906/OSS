package com.shinowit.actions.merchandiseInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
public class UpdateMerchandiseInfo extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> dao;
    private TMeMerchandiseInfo merchandiseInfo;
    private String message;
    private boolean success;

    public String UpdateMerchandiseInfo() {


        Object o = dao.update(merchandiseInfo);
        if (o != null) {

            setSuccess(true);
            message = "修改成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "修改失败";
            return SUCCESS;
        }

    }


    public TMeMerchandiseInfo getMerchandiseInfo() {
        return merchandiseInfo;
    }

    public void setMerchandiseInfo(TMeMerchandiseInfo merchandiseInfo) {
        this.merchandiseInfo = merchandiseInfo;
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
