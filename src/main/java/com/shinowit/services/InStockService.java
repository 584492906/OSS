package com.shinowit.services;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
@Service
public class InStockService {
    @Resource
    private BaseDao<TMeInStockInfo> instockdao;
    @Resource
    private BaseDao<TMeInStockDetailsInfo> instockdetadao;

    @Transactional
    public boolean save(TMeInStockInfo instockinfo, List<TMeInStockDetailsInfo> instockDinfo) {
        boolean result = false;

        if (instockDinfo != null) {

            try {
                String instockId = (String) instockdao.insert(instockinfo);
                for (TMeInStockDetailsInfo instde : instockDinfo) {
                    instde.setMeInStockInfo(instockinfo);
                    instockdetadao.insert(instde);
                }
                result = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return false;
        }
        return result;
    }


}
