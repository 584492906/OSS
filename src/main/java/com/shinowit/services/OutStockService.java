package com.shinowit.services;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
@Service
public class OutStockService {
    @Resource
    private BaseDao<TMeOutStockInfo> outStockInfoDao;
    @Resource
    private BaseDao<TMeOutStockDetailsInfo> outStockDetailsInfoDao;


    @Transactional
    public boolean insertOutStock(TMeOutStockInfo outStockInfo, List<TMeOutStockDetailsInfo> outStockDetailsInfo) {

        boolean result = false;

        try {

            String outStock = (String) outStockInfoDao.insert(outStockInfo);
            for (TMeOutStockDetailsInfo outStockDetailInfo : outStockDetailsInfo) {

                outStockDetailInfo.setMeOutStockInfo(outStockInfo);
                outStockDetailsInfoDao.insert(outStockDetailInfo);
            }

            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


}
