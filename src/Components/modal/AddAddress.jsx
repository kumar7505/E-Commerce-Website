import React from 'react';
import styles from './AddAddress.module.scss';

const AddAddress = () => {
  return (
    <>
        <form>
            <div class="styles.segment">
                <h1>Sign up</h1>
            </div>
            
            <label>
                <input type="text" placeholder="Email Address"/>
            </label>
            <label>
                <input type="password" placeholder="Password"/>
            </label>
            <button class="styles.red" type="button"><i class="icon ion-md-lock"></i> Log in</button>
            
            <div class="styles.segment">
                <button class="styles.unit" type="button"><i class="icon ion-md-arrow-back"></i></button>
                <button class="styles.unit" type="button"><i class="icon ion-md-bookmark"></i></button>
                <button class="styles.unit" type="button"><i class="icon ion-md-settings"></i></button>
            </div>
            
            <div class="styles.input-group">
                <label>
                <input type="text" placeholder="Email Address"/>
                </label>
                <button class="styles.unit" type="button"><i class="icon ion-md-search"></i></button>
            </div>
            
        </form>
    </>
  )
}

export default AddAddress