//
//  JoinLogin.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import SwiftUI

struct JoinLogin: View {
    var body: some View {
        NavigationView{
            ZStack {
                Color.blue.ignoresSafeArea()
                VStack {
                    Spacer()
                    Text("Here's A Film")
                        .font(.title)
                        .fontWeight(.heavy)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.horizontal)
                    Spacer()
                    NavigationLink {
                        LogIn()
                    } label: {
                        Text("Log In")
                            .foregroundColor(.blue)
                            .fontWeight(.bold)
                            .background(Capsule()
                                .fill(.white)
                                .frame(width: 200, height: 40))
                    }
                    .padding(.vertical)
                    NavigationLink {
                        Join()
                    } label: {
                        Text("Sign Up")
                            .foregroundColor(.blue)
                            .fontWeight(.bold)
                            .background(Capsule()
                                .fill(.white)
                                .frame(width: 200, height: 40))
                    }.padding(.vertical)
                }.padding(.vertical)
            }
        }
    }
}

struct JoinLogin_Previews: PreviewProvider {
    static var previews: some View {
        JoinLogin()
    }
}
