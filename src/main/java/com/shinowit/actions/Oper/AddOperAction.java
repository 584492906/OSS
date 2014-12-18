package com.shinowit.actions.Oper;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class AddOperAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private TAuOperInfo oper;
    private String message;
    private boolean success;
    private boolean result;


    public String addOper() {

        List<TAuOperInfo> obj = (List)dao.findByHql("from TAuOperInfo where operName=? and state='true'", oper.getOperName());

        if (obj.size()>0) {

            setSuccess(true);
            setResult(false);
            message="该用户已存在！";

            return SUCCESS;
        } else {

            Object o = null;
            try {
                o = dao.insert(oper);
            } catch (Exception e) {
                e.printStackTrace();
            }
            if (o != null) {
                setSuccess(true);
                setResult(true);
                message = "添加成功!";
            } else {
                setSuccess(true);
                setResult(false);
                message = "添加失败";

            }
        }
            return SUCCESS;
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
