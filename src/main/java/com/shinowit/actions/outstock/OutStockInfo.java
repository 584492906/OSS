package com.shinowit.actions.outstock;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import com.shinowit.services.OutStockService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class OutStockInfo extends ActionSupport {

    private TMeOutStockInfo outStockInfo;
    private List<TMeOutStockDetailsInfo> outStockDetailsInfo;
    private boolean success;
    private String message;
    @Resource
    private OutStockService outStock;

    public String insertOutstockinfo() {

        boolean result = outStock.insertOutStock(outStockInfo, outStockDetailsInfo);
        if (result == true) {
            setSuccess(true);
            message = "出库成功";
            return SUCCESS;

        } else {

            setSuccess(true);
            message = "出库失败";
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

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public List<TMeOutStockDetailsInfo> getOutStockDetailsInfo() {
        return outStockDetailsInfo;
    }

    public void setOutStockDetailsInfo(List<TMeOutStockDetailsInfo> outStockDetailsInfo) {
        this.outStockDetailsInfo = outStockDetailsInfo;
    }

}
