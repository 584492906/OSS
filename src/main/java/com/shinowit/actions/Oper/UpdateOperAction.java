package com.shinowit.actions.Oper;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/4.
 */
public class UpdateOperAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private TAuOperInfo oper;
    private String message;
    private boolean success;
    private boolean result;


    public String updateOper() {
        boolean a = false;
        try {
            a = dao.update(oper);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (true == a) {
            setResult(true);
            setSuccess(true);
            message = "修改成功!";
            return SUCCESS;
        } else {
            setSuccess(true);
            setResult(false);
            message = "修改失败!";
            return SUCCESS;
        }


    }
    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
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

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
}
