package com.shinowit.actions.supplier;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-10.
 */
public class DelSupplierAction extends ActionSupport {
    @Resource
    private BaseDao<TBaSupplierInfo> dao;
    private TBaSupplierInfo supplier;
    private boolean success;
    private String message;

    public String delSupplier() {

        boolean result = dao.delete(supplier);

        if ((result == true)) {

            setSuccess(true);
            message = "删除成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "删除失败";

            return SUCCESS;

        }
    }


    public TBaSupplierInfo getSupplier() {
        return supplier;
    }

    public void setSupplier(TBaSupplierInfo supplier) {
        this.supplier = supplier;
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
