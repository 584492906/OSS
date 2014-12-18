package com.shinowit.actions.supplier;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-10.
 */
public class UpdateSupplierAction extends ActionSupport {
    @Resource
    private BaseDao<TBaSupplierInfo> dao;
    private TBaSupplierInfo supplier;
    private boolean success;
    private String message;

    public String updateSupplier() {

        boolean resault = dao.update(supplier);

        if (resault == true) {

            setSuccess(true);
            message = "修改成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "修改失败";

            return SUCCESS;
        }
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

    public TBaSupplierInfo getSupplier() {
        return supplier;
    }

    public void setSupplier(TBaSupplierInfo supplier) {
        this.supplier = supplier;
    }
}
