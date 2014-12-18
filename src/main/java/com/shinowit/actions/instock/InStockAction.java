package com.shinowit.actions.instock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.services.InStockService;

import javax.annotation.Resource;
import java.util.List;


public class InStockAction extends ActionSupport {

    private List<TMeInStockDetailsInfo> instockDinfo;
    private TMeInStockInfo instockinfo;
    @Resource
    private InStockService instock;
    private String message;
    private boolean success;


    public String insertStock() {
        // dao.insert(instockinfo);

        boolean result = instock.save(instockinfo, instockDinfo);
        if (result == true) {
            setSuccess(true);
            message = "成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "失败";
            return SUCCESS;
        }

    }


    public List<TMeInStockDetailsInfo> getInstockDinfo() {
        return instockDinfo;
    }

    public void setInstockDinfo(List<TMeInStockDetailsInfo> instockDinfo) {
        this.instockDinfo = instockDinfo;
    }

    public TMeInStockInfo getInstockinfo() {
        return instockinfo;
    }

    public void setInstockinfo(TMeInStockInfo instockinfo) {
        this.instockinfo = instockinfo;
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
